const baseURL = "https://reqres.in/api";

export function fetchUsersService(page?: number) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/users?page=${page}`)
      .then(res => {
        return res.json();
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function fetchOneUserService(id?: number) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/users/${id}`)
      .then(res => {
        return res.json();
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

