import './styles.css'
export default function LoadingIcon({size}) {
    return (
        <div className="loading-icon-container">
            <i className={`fa fa-spinner fa-pulse ${size}`}/>
        </div>
    )
}