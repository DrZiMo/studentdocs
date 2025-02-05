import React, { useEffect, useState } from 'react';
import faculties from '../data/faculties';
import Back from '../components/back';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../components/errorAlert';
import Loading from '../components/loading';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { uploadDocumentFn } from '../../redux/slices/documentSlices/uploadDocumentSlice';
import { getAllFaculties } from '../../redux/slices/facultySlices/facultySlice';
import { getAllCourses } from '../../redux/slices/courseSlices/courseSlice';
import { getAllClassesFn } from '../../redux/slices/classSlices/classSlice';

const UploadPage = () => {
  const uploadState = useSelector(state => state.uploadDocument);
  const facultiesData = useSelector(state => state.faculty.data);
  const coursesData = useSelector(state => state.course.data);
  const classesData = useSelector(state => state.class.data)
  const [selectedFaculty, setSelectedFaculty] = useState(faculties[0]?.name || "");
  const [selectedYear, setSelectedYear] = useState("fresh");
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('Click to Upload File');
  const successToastId = 'success-toast';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentFaculty = faculties.find(faculty => faculty.name === selectedFaculty);
  const availableYears = currentFaculty?.classes.map(classGroup => classGroup.year) || [];
  const availableClasses =
    currentFaculty?.classes.find(classGroup => classGroup.year === selectedYear)?.classes || [];

  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    if (!userData) {
      navigate('studentdocs/auth/login');
    }
  }, [userData]);

  useEffect(() => {
    dispatch(getAllFaculties());
    dispatch(getAllCourses());
    dispatch(getAllClassesFn())
  }, [])

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setSelectedFileName(file.name);
      formik.setFieldValue('file', file);
    } else {
      setSelectedFileName('Click to Upload File');
    }
  };

  useEffect(() => {
    if (!formik.values.faculty && facultiesData?.faculties?.length) {
      formik.setFieldValue("faculty", facultiesData.faculties[0].id);
    }
  }, [facultiesData]);

  useEffect(() => {
    if (!formik.values.course && coursesData?.courses?.length) {
      formik.setFieldValue("course", coursesData.courses[0].id);
    }
  }, [coursesData]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      faculty: '',
      course: '',
      year: 1,
      classes: [],
      file: null,
    },
    onSubmit(values) {
      const data = {
        name: values.name,
        description: values.description,
        faculty_id: values.faculty,
        course_id: values.course,
        classes: values.classes,
        file: values.file,
      };
      dispatch(uploadDocumentFn(data));
    },
    validationSchema: yup.object({
      name: yup.string().required("Please enter the name"),
      description: yup.string(),
      file: yup.mixed().required('Please select the file'),
    }),
  });

  useEffect(() => {
    if (uploadState?.uploadError) {
      toast.error(uploadState.uploadError, {
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

    if (uploadState?.uploadData?.isSuccess) {
      toast.success("Uploaded Successfully", {
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
  }, [uploadState.uploadData, uploadState.uploadError]);

  return facultiesData.isLoading || coursesData.isLoading ? <div className='w-full h-screen flex justify-center items-center'><Loading /></div> : (
    <div className='w-[80%] md:w-[500px] mx-auto my-10 flex flex-col gap-6'>
      <Back to={userData.user.role === 'admin' ? '/studentdocs/dashboard/admin' : '/studentdocs/dashboard/teacher'} />
      <form onSubmit={formik.handleSubmit} className='rounded-lg flex flex-col gap-4'>
        <div className='info-section bg-white rounded-md shadow-md'>
          <div className="top-part bg-blue-700 text-white font-semibold font-konit text-center text-2xl py-3 rounded-tl-lg rounded-tr-lg">Upload</div>

          <div className='px-4 py-4 grid grid-cols-1'>
            {uploadState.uploadError && (
              <ErrorAlert message={uploadState.uploadError} />
            )}

            {/* Document Name */}
            <label htmlFor="doc-name">Document name<span className='text-red-500 font-bold text-lg'>*</span></label>
            <input type="text" name='name' id='doc-name' className='bg-gray-200 rounded-md px-3 py-2 outline-none' onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <p className="text-sm font-bold text-red-500">
              {formik.touched.name && formik.errors.name}
            </p>

            {/* Description */}
            <label htmlFor="doc-desc" className='mt-2'>Description (optional)</label>
            <input type="text" name='description' onChange={formik.handleChange} onBlur={formik.handleBlur} id='doc-desc' className='bg-gray-200 rounded-md px-3 py-2 outline-none' />
            <p className="text-sm font-bold text-red-500">
              {formik.touched.description && formik.errors.description}
            </p>

            {/* Faculty Selection */}
            <label htmlFor="doc-faculty" className='mt-2'>Faculty<span className='text-red-500 font-bold text-lg'>*</span></label>
            <select name="faculty" id="doc-faculty" className='bg-gray-200 rounded-md px-3 py-2 outline-none w-full' value={formik.values.faculty} onChange={formik.handleChange}>{
              facultiesData?.faculties?.map((faculty, index) => (
                <option key={index} value={faculty.id}>{faculty.name}</option>
              ))
            }</select>
            <p className="text-sm font-bold text-red-500">
              {formik.touched.faculty && formik.errors.faculty}
            </p>

            {/* Course Selection */}
            <label htmlFor="doc-course" className='mt-2'>Course<span className='text-red-500 font-bold text-lg'>*</span></label>
            <select name="course" id="doc-course" className='bg-gray-200 rounded-md px-3 py-2 outline-none w-full' value={formik.values.course} onChange={formik.handleChange}>{
              coursesData?.courses?.filter((course) => course.faculty_id === formik.values.faculty).map((course, index) => (
                <option key={index} value={course.id}>{course.name}</option>
              ))
            }</select>
            <p className="text-sm font-bold text-red-500">
              {formik.touched.classes && formik.errors.classes}
            </p>

            {/* Year Selection */}
            <label htmlFor="doc-year" className='mt-2'>Year<span className='text-red-500 font-bold text-lg'>*</span></label>
            <select className='bg-gray-200 rounded-md px-3 py-2 outline-none w-full' name='year' value={formik.values.year} onChange={(e) => formik.setFieldValue('year', Number(e.target.value))} onBlur={formik.handleBlur}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
            <p className="text-sm font-bold text-red-500">
              {formik.touched.year && formik.errors.year}
            </p>

            {/* Class Selection */}
            <label htmlFor="doc-class" className='mt-2'>Class<span className='text-red-500 font-bold text-lg'>*</span></label>
            <div className='text-lg'>
              {classesData?.classes?.length > 0 ? (
                classesData?.classes?.filter(classItem => classItem.faculty_id === formik.values.faculty).filter((classItem) => classItem.year == formik.values.year).map((classItem, index) => (
                  <label key={index} className="block">
                    <input
                      name='classes'
                      type="checkbox"
                      className='w-4 h-4 mr-1 border-gray-300 rounded-sm bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-150 ease-in-out'
                      value={classItem.id}
                      checked={Array.isArray(formik.values.classes) && formik.values.classes.includes(classItem.id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const newClasses = checked
                          ? [...formik.values.classes, classItem.id]
                          : formik.values.classes.filter(c => c !== classItem.id);
                        formik.setFieldValue('classes', newClasses);
                      }}
                    />
                    {classItem.name}
                  </label>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No Classes found</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white shadow-md p-4 rounded-lg flex flex-col gap-4 items-center">
          <h2 className="text-lg font-semibold">Upload File</h2>
          <label className="cursor-pointer p-4 border-dashed border-2 border-blue-500 rounded-lg w-full text-center">
            <input type="file" name='file' className="hidden" onChange={handleFileChange} />
            📁 {selectedFileName}
          </label>
        </div>
        <button type="submit" disabled={uploadState.uploadLoading || !formik.isValid} className="disabled:bg-gray-400 bg-blue-600 hover:bg-blue-800 transition text-white p-2 rounded">
          {uploadState.uploadLoading ? <Loading /> : "Upload"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UploadPage;
