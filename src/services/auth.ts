const API_BASE_URL = '/api/auth';

// api to login
// req : email, password
// res : user
export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to log in');
  }

  return response.json();
};

// api to signup
// req : email, password, name
// res : user
export const signup = async (email: string, password: string, name: string) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to sign up');
  }

  return response.json();
};
