import { useFormik } from "formik";
import * as yup from 'yup';
import Back from "../../components/back";
import { useDispatch, useSelector } from "react-redux";
import { loginFn } from "../../../redux/slices/auth/loginSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/errorAlert";
import Loading from "../../components/loading";
import { toast, Bounce } from "react-toastify";

const LoginPage = () => {
    const loginState = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const successToastId = 'success-toast'

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit(values) {
            const data = {
                email: values.email,
                password: values.password
            }
            dispatch(loginFn(data))
        },

        validationSchema: yup.object({
            email: yup.string().email("Please enter valid email").required("Please enter email"),
            password: yup.string().min(8, "Password must be atleast 8 characters").required("Please enter password")
        })
    })

    useEffect(() => {
        if (loginState?.error) {
            toast.error(loginState.error, {
                toastId: successToastId,
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }

        if (loginState?.data?.isSuccess) {
            toast.success('Loggin in successfully', {
                toastId: successToastId,
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            localStorage.setItem("userData", JSON.stringify(loginState.data))
            if (loginState.data.user.role === 'admin') {
                navigate('/dashboard/admin')
            }

            if (loginState.data.user.role === 'teacher') {
                navigate('/dashboard/teacher')
            }
        }
    }, [loginState.error, loginState.data])

    return (
        <div className='w-[70%] md:w-[400px] mx-auto my-10 flex flex-col gap-6'>
            <Back />
            { }
            <div className="w-full bg-white shadow-md rounded-lg flex flex-col">
                <div className="top-part bg-blue-700 text-white font-semibold font-konit text-center text-2xl py-3 rounded-tl-lg rounded-tr-lg mb-4">Login</div>
                {loginState.error && loginState.error && (
                    <div className="px-4">
                        <ErrorAlert message={loginState.error && loginState.error} />
                    </div>
                )}
                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 px-4 pb-4">
                    <label htmlFor="email">Email</label>
                    <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' value={formik.values.email} name='email' className='bg-gray-200 rounded-md px-3 py-2 outline-none' />
                    <p className="text-sm font-bold text-red-500">
                        {formik.touched.email && formik.errors.email}
                    </p>
                    <label htmlFor="password" className='mt-2'>Password</label>
                    <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' value={formik.values.password} name="password" className='bg-gray-200 rounded-md px-3 py-2 outline-none' />
                    <p className="text-sm font-bold text-red-500">
                        {formik.touched.password && formik.errors.password}
                    </p>
                    <button type="submit" disabled={loginState.loading || !formik.isValid} className="disabled:bg-gray-400 bg-blue-600 hover:bg-blue-800 transition text-white p-2 rounded mt-4 cursor-pointer">
                        {loginState.loading ? <Loading /> : "Login"}
                    </button>
                </form>
            </div>
        </div >
    );
};

export default LoginPage;
