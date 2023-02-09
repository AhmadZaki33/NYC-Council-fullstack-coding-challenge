import axios from 'axios';

export async function login(loginData, setToken) {
  try {
    const { data } = await axios.post('http://localhost:8000/login/', loginData);
    setToken(data.token);
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('username', loginData.username);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getUserComplaints(token) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { data } = await axios.get('http://localhost:8000/api/complaints/', config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getUserOpenComplaints(token) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { data } = await axios.get('http://localhost:8000/api/complaints/openCases/', config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getUserClosedComplaints(token) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { data } = await axios.get('http://localhost:8000/api/complaints/closedCases/', config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getUserTopComplaints(token) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { data } = await axios.get('http://localhost:8000/api/complaints/topComplaints/', config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getUsersConstituentsComplaints(token) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { data } = await axios.get(
      'http://localhost:8000/api/complaints/constituentsComplaints/',
      config
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
