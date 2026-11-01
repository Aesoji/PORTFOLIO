import { Link } from "react-router";

export default function Home() {
    return (
        <> 
            <h1> KENNETH'S PORTFOLIO </h1>
            <br></br>
        
            <h4 className="navBarItem">
                <Link 
                    to="/about"
                    className="navBarButton"> {"about"}
                </Link>
                <br></br>
                <Link 
                    to="/about#contact"
                    className="navBarButton"> {"contact"}
                </Link>
            </h4>
        </>
    );
}

