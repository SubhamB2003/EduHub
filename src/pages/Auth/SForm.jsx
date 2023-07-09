/* eslint-disable no-undef */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from "axios";
import imageCompression from 'browser-image-compression';
import { Formik } from 'formik';
import { useState } from 'react';
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import done from "../../assets/sounds/done.mp3";
import Flexbetween from "../../components/Flexbetween";
import { setLogin } from "../../global/State";


const loginSchema = yup.object().shape({
    email: yup.string().email("email required").required("email must be required"),
    password: yup.string().required("password must be required").min(5, "password must be greater then 8 character")
});

const registerSchema = yup.object().shape({
    fName: yup.string().required("firstname required"),
    lName: yup.string().required("lastname required"),
    userName: yup.string().required("username required"),
    email: yup.string().email("Invalid email").required("email required"),
    password: yup.string().required("password required").min(8, "password must be greater then 8 character"),
    gender: yup.string().required("gender required"),
    phone: yup.string().required("phone number required").min(10, "number must be 10 digit").max(10, "number must be 10 digit"),
    bloodGroup: yup.string().required("blood group required"),
    dateOfBirth: yup.string().required("date of birth required"),
    pinCode: yup.string().required("pincode required"),
    about: yup.string().required("about required"),
    institutionName: yup.string().required("institution name required"),
    institutionType: yup.string().required("institution type required"),
    standard: yup.string().required("standard required"),
    degree: yup.string().required("degree required"),
    discipline: yup.string().required("discipline required"),
    specialization: yup.string().required("specialization required"),
});

const initialRegisterValues = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    userName: "",
    phone: "",
    bloodGroup: "6",
    dateOfBirth: "",
    pinCode: "",
    gender: "Male",
    about: "",
    institutionName: "",
    institutionType: "0",
    degree: "",
    discipline: "",
    specialization: "",
    standard: ""
};


function SForm() {

    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const [visible, setVisible] = useState(false);

    const notificationBell = () => {
        new Audio(done).play();
    }

    const login = async (values) => {

        notificationBell();
        const loggedIn = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/user/student/login`, values).catch(() => {
            window.alert("Invalid authentication");
        });

        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.data.user,
                    token: loggedIn.data.token
                })
            )
        }
        navigate("/")
    }

    const register = async (values) => {
        const formData = new FormData();
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        const compressImage = await imageCompression(values.image, options);
        const userPicture = new File([compressImage], values.image.name);

        console.log(values);
        for (let value in values) {
            if (value !== "image") {
                formData.append(value, values[value]);
            }
        }
        formData.append("image", userPicture);

        const savedUserRes = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/user/student/register`, formData).catch(() => {
            window.alert("Fill the mandatory fields");
        })
        if (savedUserRes) {
            setPageType("login");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    const BloodGrp = ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"];

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialRegisterValues}
            validationSchema={isLogin ? loginSchema : registerSchema}>
            {({ values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm }) => (
                <form onSubmit={handleSubmit} >
                    <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {
                                gridColumn: isNonMobile ? undefined : "span 4"
                            },
                            fontFamily: "serif"
                        }}>
                        <TextField label="Email" name="email"
                            autoComplete='off'
                            onBlur={handleBlur} onChange={handleChange}
                            value={values.email}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                        <TextField autoComplete='off' label="Password" name="password" type={visible ? "text" : "password"}
                            onBlur={handleBlur} onChange={handleChange}
                            value={values.password}
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" onClick={() => setVisible((visibility) => !visibility)} sx={{ cursor: "pointer" }}>
                                        {visible ? <Visibility sx={{ right: "0", top: "0" }} /> : <VisibilityOff sx={{ right: "0", top: "0" }} />}
                                    </InputAdornment>
                                )
                            }} />
                        {isRegister && (
                            <>
                                <TextField autoComplete='off' label="First name" name="fName"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.fName}
                                    error={Boolean(touched.fName) && Boolean(errors.fName)}
                                    helperText={touched.fName && errors.fName}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <TextField autoComplete='off' label="Last name" name="lName"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.lName}
                                    error={Boolean(touched.lName) && Boolean(errors.lName)}
                                    helperText={touched.lName && errors.lName}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <TextField autoComplete='off' label="Username" name="userName"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.userName}
                                    error={Boolean(touched.userName) && Boolean(errors.userName)}
                                    helperText={touched.userName && errors.userName}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <TextField autoComplete='off' label="Phone number" name="phone"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.phone}
                                    error={Boolean(touched.phone) && Boolean(errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <FormControl sx={{ gridColumn: "span 2" }}>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select label="Gender"
                                        labelId="demo-simple-select-label" id="demo-simple-select"
                                        name="gender" onBlur={handleBlur} onChange={handleChange}
                                        value={values.gender}
                                        error={Boolean(touched.gender) && Boolean(errors.gender)}
                                        helpertext={touched.gender && errors.gender}
                                    >
                                        <MenuItem value="Male" sx={{ fontFamily: "serif" }}>Male</MenuItem>
                                        <MenuItem value="Female" sx={{ fontFamily: "serif" }}>Female</MenuItem>
                                        <MenuItem value="Other" sx={{ fontFamily: "serif" }}>Others</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField autoComplete='off' label="Date of Birth" name="dateOfBirth" type='date'
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.dateOfBirth}
                                    error={Boolean(touched.dateOfBirth) && Boolean(errors.dateOfBirth)}
                                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <FormControl sx={{ gridColumn: "span 2", fontFamily: "serif" }}>
                                    <InputLabel id="demo-simple-select-label1">Blood Group</InputLabel>
                                    <Select label="Blood Group"
                                        labelId="demo-simple-select-label1" id="demo-simple-select1"
                                        name="bloodGroup" onBlur={handleBlur} onChange={handleChange}
                                        value={values.bloodGroup}
                                        error={Boolean(touched.bloodGroup) && Boolean(errors.bloodGroup)}
                                        helpertext={touched.bloodGroup && errors.bloodGroup}
                                    >
                                        {BloodGrp.map((blood, i) => (
                                            <MenuItem key={i} value={i} sx={{ fontFamily: "serif" }}>{blood}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField autoComplete='off' label="Pincode" name="pinCode"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.pinCode}
                                    error={Boolean(touched.pinCode) && Boolean(errors.pinCode)}
                                    helperText={touched.pinCode && errors.pinCode}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <TextField autoComplete='off' label="About" name="about"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.about}
                                    error={Boolean(touched.about) && Boolean(errors.about)}
                                    helperText={touched.about && errors.about}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <Box
                                    gridColumn="span 2"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="0.6rem"
                                    required
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("image", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed`}
                                                p="0.2rem"
                                                height="100%"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.image ? (
                                                    <p style={{ paddingLeft: "0.4rem" }}>Add Picture Here*</p>
                                                ) : (
                                                    <Flexbetween>
                                                        <Typography>{values.image.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </Flexbetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                                <TextField autoComplete='off' label="Institution name" name="institutionName"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.institutionName}
                                    error={Boolean(touched.institutionName) && Boolean(errors.institutionName)}
                                    helperText={touched.institutionName && errors.institutionName}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />

                                <FormControl sx={{ gridColumn: "span 2" }}>
                                    <InputLabel id="demo-simple-select-label2">Institution Type</InputLabel>
                                    <Select label="Institution Type"
                                        labelId="demo-simple-select-label2" id="demo-simple-select2"
                                        name="institutionType" onBlur={handleBlur} onChange={handleChange}
                                        value={values.institutionType}
                                        error={Boolean(touched.institutionType) && Boolean(errors.institutionType)}
                                        helpertext={touched.institutionType && errors.institutionType}
                                    >
                                        <MenuItem value="0" sx={{ fontFamily: "serif" }}>school</MenuItem>
                                        <MenuItem value="1" sx={{ fontFamily: "serif" }}>college</MenuItem>
                                        <MenuItem value="2" sx={{ fontFamily: "serif" }}>university</MenuItem>
                                        <MenuItem value="3" sx={{ fontFamily: "serif" }}>Others</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField autoComplete='off' label="Degree" name="degree"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.degree}
                                    error={Boolean(touched.degree) && Boolean(errors.degree)}
                                    helperText={touched.degree && errors.degree}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <TextField autoComplete='off' label="Discipline" name="discipline"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.discipline}
                                    error={Boolean(touched.discipline) && Boolean(errors.discipline)}
                                    helperText={touched.discipline && errors.discipline}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <TextField autoComplete='off' label="specialization" name="specialization"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.specialization}
                                    error={Boolean(touched.specialization) && Boolean(errors.specialization)}
                                    helperText={touched.specialization && errors.specialization}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <TextField autoComplete='off' label="Standard" name="standard"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.standard}
                                    error={Boolean(touched.standard) && Boolean(errors.standard)}
                                    helperText={touched.standard && errors.standard}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                            </>
                        )}
                    </Box>

                    <Box>
                        <Button
                            fullWidth
                            variant='outlined'
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                padding: "0.8rem 0.6rem",
                                fontFamily: "serif",
                                fontSize: "15px"
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                    </Box>

                    <Flexbetween>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            fontFamily="serif"
                            fontSize={17}
                            color="Highlight"
                            sx={{ cursor: "pointer" }}
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up here."
                                : "Already have an account? Login here."}
                        </Typography>
                        {isLogin ? (
                            <Typography fontFamily="serif" fontSize={17} color="Highlight" textAlign="end"
                                sx={{ cursor: "pointer" }}
                            // onClick={() => navigate("/forgotpassword")}
                            >Forget Password</Typography>
                        ) : (
                            <Typography fontFamily="serif" fontSize={17} color="Highlight" textAlign="end"
                                sx={{ cursor: "pointer" }}>Terms and conditions</Typography>)}
                    </Flexbetween>
                </form>
            )}
        </Formik>
    )
}

export default SForm;