import EmptyState from "./EmptyState";

function Unavailable() {
    return (
        <div className="mt-20">
            <EmptyState
                type="generic"
                title="Feature currently unavailable"
            />
        </div>
    )
}

export default Unavailable;