
export default async function AddCollections() {
    const openModal = () => {
        console.log("The modal was opened")
    }

    return (
        <button onClick={openModal} className="py-5 px-20 bg-transparent w-full hover:bg-gray-500 text-white font-semibold hover:text-white border dark-nav-border-color rounded">
            Add Collection
        </button>
    )
} 