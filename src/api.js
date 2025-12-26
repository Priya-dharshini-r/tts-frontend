const API_BASE = "http://localhost:3000";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();

  localStorage.setItem("token", data.token);

  return data.user;
}

export async function signupUser(email, password) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Signup failed");
  }

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data.user;
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export async function generateVoice(payload) {
  const res = await fetch(`${API_BASE}/generate_voice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
}

export async function getVoice(id) {
  const res = await fetch(`${API_BASE}/voice_generations/${id}`, {
    headers: {
      ...authHeaders(), 
    },
  });

  if (res.status === 404) {
    return { status: "not_found" };
  }

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}

export async function getHistory() {
  const res = await fetch(`${API_BASE}/voice_generations`, {
    headers: {
      ...authHeaders(), 
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}
