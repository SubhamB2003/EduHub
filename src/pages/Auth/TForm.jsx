/* eslint-disable no-unused-vars */

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
import Flexbetween from "../../components/Flexbetween";
import { setLogin } from "../../global/State";


const loginSchema = yup.object().shape({
    email: yup.string().email("email required").required("email must be required"),
    password: yup.string().required("password must be required").min(8, "password must be greater then 8 character")
});

const registerSchema = yup.object().shape({
    fName: yup.string().required("firstname required"),
    lName: yup.string().required("lastname required"),
    email: yup.string().email("Invalid email").required("email required"),
    password: yup.string().required("password required").min(8, "password must be greater then 8 character"),
    userName: yup.string().required("user name is required"),
    phone: yup.string().required("phone number required").min(10, "number must be 10 digit").max(10, "number must be 10 digit"),
    pinCode: yup.string().required("pincode required"),
    dateOfBirth: yup.string().required("date of birth required"),
    bloodGroup: yup.string().required("blood group required"),
    gender: yup.string().required("gender required"),
    experience: yup.number().required("experience required"),
    about: yup.string().required("about required"),
    occupation: yup.string().required("occupation required"),
});

const initialRegisterValues = {
    email: "",
    password: "",
    fName: "",
    lName: "",
    userName: "",
    phone: "",
    gender: "Male",
    dateOfBirth: "",
    bloodGroup: "6",
    pinCode: "",
    about: "",
    experience: "",
    occupation: "",
};


function TForm() {

    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const [visible, setVisible] = useState(false);

    const login = async (values, onSubmitProps) => {

        const loggedIn = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/user/teacher/login`, values).catch((err) => {
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

    const register = async (values, onSubmitProps) => {

        const formData = new FormData();
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        const compressImage = await imageCompression(values.image, options);
        const userPicture = new File([compressImage], values.image.name);

        for (let value in values) {
            if (value !== "image") {
                formData.append(value, values[value]);
            }
        }
        formData.append("image", userPicture);

        const savedUserRes = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/user/teacher/register`, formData).catch((err) => {
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

                                <TextField autoComplete='off' label="Date of Birth" name="dateOfBirth" type="date"
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
                                                border={`2px dashed ${palette.primary.main}`}
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

                                <TextField autoComplete='off' label="Pincode" name="pinCode"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.pinCode}
                                    error={Boolean(touched.pinCode) && Boolean(errors.pinCode)}
                                    helperText={touched.pinCode && errors.pinCode}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <TextField autoComplete='off' label="Experience" name="experience"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.experience}
                                    error={Boolean(touched.experience) && Boolean(errors.experience)}
                                    helperText={touched.experience && errors.experience}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <TextField autoComplete='off' label="Occupation" name="occupation"
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.occupation}
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
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
                                padding: "1rem 0.6rem",
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

export default TForm;