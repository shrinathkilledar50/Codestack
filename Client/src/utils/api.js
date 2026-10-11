const API_URL = 'http://localhost:8000';

const apiRequest = async (endpoint, method = 'GET', data = null) => {
    const url = `${API_URL}${endpoint}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {

        const response = await fetch(url, options);

        return response;
    } catch (error) {
        throw new Error('An error occurred while processing your request');
    }
};

export const signUp = (signupData) => {
    return apiRequest('/user/createUser', 'POST',
        signupData);
};

export const login = (loginData) => {
    return apiRequest('/user/login', 'POST', loginData);
};

export const getUsers = () => {
    return apiRequest('/user', 'GET');
}

export const getUserById = (id) => {
    return apiRequest(`/user/${id}`, 'GET');
}

export const updateUser = (id, userData) => {
    return apiRequest(`/user/updateById/${id}`, 'PUT', userData);
}

export const changeUserPassword = (id, changeUserPasswordData) => {
    return apiRequest(`/user/changePassword/${id}`, 'PUT', changeUserPasswordData);
}

export const userForgotPassword = (email) => {
    return apiRequest(`/user/forgotPassword/${email}`, 'PUT');
}

export const techExpertRegister = (signupData) => {
    return apiRequest('/techExpert/createUser', 'POST',
        signupData);
};

export const techExpertLogin = (loginData) => {
    return apiRequest('/techExpert/login', 'POST', loginData);
};

export const getTechExperts = () => {
    return apiRequest('/techExpert', 'GET');
}

export const getTechExpertById = (id) => {
    return apiRequest(`/techExpert/${id}`, 'GET');
}

export const updateTechExpertById = (id, userData) => {
    return apiRequest(`/techExpert/updateById/${id}`, 'PUT', userData);
}

export const changeTechExpertPassword = (id, changeUserPasswordData) => {
    return apiRequest(`/techExpert/changePassword/${id}`, 'PUT', changeUserPasswordData);
}

export const techExpertForgotPassword = (email) => {
    return apiRequest(`/techExpert/forgotPassword/${email}`, 'PUT');
}

export const approveTechExpert = (id) => {
    return apiRequest(`/techExpert/approve/${id}`, 'PUT');
}

export const rejectTechExpert = (id) => {
    return apiRequest(`/techExpert/reject/${id}`, 'PUT');
}

export const adminLogin = (data) => {
    return apiRequest(`/admin/login/`, 'POST', data);
}

export const adminForgotPassword = (email) => {
    return apiRequest(`/admin/forgotPassword/${email}`, 'PUT');
}



export const createTechnology = (categoryData) => {
    return apiRequest('/technology/createCategory', 'POST', categoryData);
}

export const getAllTechnologies = () => {
    return apiRequest('/technology/', 'GET');
}

export const updateTechnologyById = (id, updateCategoryData) => {
    return apiRequest(`/technology/updateCategoryById/${id}`, 'PUT', updateCategoryData);
}

export const deleteTechnologyById = (id) => {
    return apiRequest(`/technology/deleteCategoryById/${id}`, 'DELETE')
}


export const createErrorType = (categoryData) => {
    return apiRequest('/errorType/createCategory', 'POST', categoryData);
}

export const getAllErrorTypes = () => {
    return apiRequest('/errorType/', 'GET');
}

export const updateErrorTypeById = (id, updateCategoryData) => {
    return apiRequest(`/errorType/updateCategoryById/${id}`, 'PUT', updateCategoryData);
}

export const deleteErrorTypeById = (id) => {
    return apiRequest(`/errorType/deleteCategoryById/${id}`, 'DELETE')
}

export const createAnswers = (data) => {
    return apiRequest('/answers/create', 'POST', data);
}

export const getAllAnswers = () => {
    return apiRequest('/answers/', 'GET');
}

export const updateAnswersById = (id, data) => {
    return apiRequest(`/answers/updateAnswerById/${id}`, 'PUT', data);
}

export const deleteAnswersById = (id) => {
    return apiRequest(`/answers/deleteAnswerById/${id}`, 'DELETE')
}

export const getAnswersByTechnology = (technology) => {
    return apiRequest(`/answers/getAnswersByTechnology/${technology}`, 'GET');
}

export const getAnswersByErrorType = (errorType) => {
    return apiRequest(`/answers/getAnswersByErrorType/${errorType}`, 'GET');
}

export const getAnswersByTechnologyAndErrorType = (technology, errorType) => {
    return apiRequest(`/answers/getAnswersByTechnologyAndErrorType/${technology}/${errorType}`, 'GET');
}



export const createCategory = (categoryData) => {
    return apiRequest('/category/createCategory', 'POST', categoryData);
}

export const getAllCategories = () => {
    return apiRequest('/category', 'GET');
}

export const updateCategoryById = (id, updateCategoryData) => {
    return apiRequest(`/category/updateCategoryById/${id}`, 'PUT', updateCategoryData);
}

export const deleteCategoryById = (id) => {
    return apiRequest(`/category/deleteCategoryById/${id}`, 'DELETE')
}

export const createSubcategory = (subcategoryData) => {
    return apiRequest('/subcategory/createSubcategory', 'POST', subcategoryData);
}

export const deleteSubcategoryById = () => {
    return apiRequest('/subcategory', 'GET');
}

export const getAllSubcategories = (id, updateSubcategoryData) => {
    return apiRequest(`/subcategory/updateSubcategoryById/${id}`, 'PUT', updateSubcategoryData);
}

export const updateSubcategoryById = (id) => {
    return apiRequest(`/subcategory/deleteSubcategoryById/${id}`, 'DELETE')
}


export const createNotification = (notificationData) => {
    return apiRequest('/notification/createNotification', 'POST', notificationData);
}

export const getAllNotifications = () => {
    return apiRequest('/notification', 'GET');
}

export const updateNotificationById = (id, updateNotificationData) => {
    return apiRequest(`/notification/updateNotificationById/${id}`, 'PUT', updateNotificationData);
}

export const deleteNotificationById = (id) => {
    return apiRequest(`/notification/deleteNotificationById/${id}`, 'DELETE')
}
