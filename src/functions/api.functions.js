//GET
export default async function getData(url, token = null, onUnauthorized) {
  try {
    const res = await fetch(url, {
      headers: token ? {Authorization: `Bearer ${token}`} : {},
    });
    if (!res.ok) {
      if (res.status === 401) {
        onUnauthorized();
        throw new Error('Unauthorized');
      }
      throw new Error(res.status);
    }

    const json = await res.json();
    return json;
  } catch (err) {
    throw err;
  }
}

//Post
export async function postData(url, data, authToken = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && {Authorization: `Bearer ${authToken}`}),
  };

  let res, result;

  try {
    res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    result = await res.json();
    if (!res.ok) {
      throw new Error(result?.message || 'Server Error');
    }
    return result;
  } catch (err) {
    console.error('Network or JSON error:', err);
    throw new Error('Network or JSON error');
  }
}
