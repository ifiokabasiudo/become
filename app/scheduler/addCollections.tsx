
export default async function AddCollections() {
    const openModal = () => {
        console.log("The modal was opened")
    }

    return (
        <div className="py-5 px-28">
            <button onClick={openModal} className="py-2 bg-transparent w-full hover:buttons text-white font-semibold hover:text-white border dark-nav-border-color rounded">
                Add Collection
            </button>
        </div>
    )
} 