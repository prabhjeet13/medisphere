export const doctor = {
    signup : 'http://localhost:4001/api/v1/doctor/signupdoctor',
    signin : 'http://localhost:4001/api/v1/doctor/signindoctor',
    getdoctorsbyspecialities : 'http://localhost:4001/api/v1/doctor/getdoctorsbyspeciality',
    getdoctorsbyid : 'http://localhost:4001/api/v1/doctor/getdoctorbyid',
    editdetails : 'http://localhost:4001/api/v1/doctor/editdoctordetails',
    getalldoctorsactive : 'http://localhost:4001/api/v1/doctor/getalldoctors',
    getalldoctorspending : 'http://localhost:4001/api/v1/doctor/getalldoctorspending',
    editdoctorAvailaility : 'http://localhost:4001/api/v1/doctor/editdoctoravailability',
}

export const patient = {
    signup : 'http://localhost:4001/api/v1/patient/signuppatient',
    signin : 'http://localhost:4001/api/v1/patient/signinpatient',
    getpatientbyid : 'http://localhost:4001/api/v1/patient/getpatientbyid',
    editdetails : 'http://localhost:4001/api/v1/patient/editpatientdetails',
}

export const admin = {
    signup : 'http://localhost:4001/api/v1/admin/signupadmin',
    signin : 'http://localhost:4001/api/v1/admin/signinadmin',
    givepermission : 'http://localhost:4001/api/v1/admin/givepermission'
}

export const specialization =  {
    add : 'http://localhost:4001/api/v1/specialization/addspecialiation',
    getall : 'http://localhost:4001/api/v1/specialization/getallspecializations'
}

export const otp = {
    sendotp : 'http://localhost:4001/api/v1/otp/sendotp',
}