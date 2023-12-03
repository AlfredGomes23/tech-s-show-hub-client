/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



const PaymentPart = ({ amount, setError, refetch }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        axiosSecure.post('/payment-intent', { amount })
            .then(res => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            });
    }, [axiosSecure, amount]);

    const handlePay = async e => {
        e.preventDefault();
        setClicked(true);

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement)

        if (card === null) return;

        // eslint-disable-next-line no-unused-vars
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card', card
        });

        if (error) {
            // console.log('payment error', error);
            setError(error.message);
        }
        else {
            // console.log('payment method', paymentMethod)
            setError('');
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            toast.error('confirm error')
        }
        else {
            // console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // on payment successful
                // console.log('transaction id', paymentIntent.id);

                // now change the role of user
                const result = await axiosSecure.patch('/user', {
                    email: user?.email, role: "Subscriber", t_id: paymentIntent.id
                });
                if (result.data.modifiedCount) {
                    toast.success("Congrats, to Our New Subscriber.");
                    toast("Please reload the Page.");
                    refetch();
                }
            }
        }

    }

    return (
        <form onSubmit={handlePay}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm mx-auto flex btn-secondary my-4" type="submit" disabled={clicked || !stripe || !clientSecret}>
                Pay ${amount}
            </button>

        </form>
    );
};

export default PaymentPart;