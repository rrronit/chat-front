import { useNavigate } from "react-router-dom"

const Home = () => {
    const Navigate=useNavigate()
    Navigate("/login")
  return (
    <div>Home</div>
  )
}

export default Home