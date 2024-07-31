const Card = (props) =>{
    return(
        <div className={`w-auto ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Card