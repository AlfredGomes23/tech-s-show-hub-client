/* eslint-disable react/prop-types */

const PageTitle = ({title}) => {
    return (
        <div className='my-5'>
            <h1 className='text-3xl text-center'>{title}</h1>
            <div className="divider w-4/5 mx-auto"></div>
        </div>
    );
};

export default PageTitle;