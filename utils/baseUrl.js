const baseUrl = 
process.env.NODE_ENV === 'production'
  ? 'https://deploymenturl.sh' 
  : 'http://localhost:3000'

export default baseUrl