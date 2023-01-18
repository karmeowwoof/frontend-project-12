/* eslint-disable import/prefer-default-export */

export const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (user && { Authorization: `Bearer ${user.token}` }) || {};
};
