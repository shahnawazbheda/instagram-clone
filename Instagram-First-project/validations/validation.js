

exports.requiredField = (field) => {
    return field && field.trim() !== '';
};

exports.validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

exports.validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
};

exports.validateUserName = (userName) => {
    const userNameRegex = /^[a-zA-Z0-9_]+$/;
    return userNameRegex.test(userName);
};

exports.validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};