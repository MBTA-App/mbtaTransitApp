import jwt_decode from 'jwt-decode'

const getUserInfo = () => {
  const accessToken = localStorage.getItem('accessToken')
  const userName = localStorage.getItem('username')
  if (!accessToken) return undefined
  return jwt_decode(accessToken)
}

export default getUserInfo
