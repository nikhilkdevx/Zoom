import "./Navbar.css"
export default function Navbar(){
    return(
        <div className="Navbar">
            <div className="NavbarHead">
                <h2>NexaMeet</h2>
            </div>
            <div className="Navbarbtns">
                <button><p>SignUp</p></button>
                <button><p>Login</p></button>
                <button><p>Guest User</p></button>
            </div>
        </div>
    )
} 