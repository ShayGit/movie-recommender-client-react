 import './styles.css'
export default function DeleteButton({deleteRating}) {
    return (
        <div className="delete-button" onClick={deleteRating}>
            <i className="fa fa-trash"/>
        </div>
    )
}