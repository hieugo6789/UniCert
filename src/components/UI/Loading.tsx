import loadingGif from "../../assets/images/loading.gif";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-500">
          <img src={loadingGif} alt="" />
        </div>
  )
}

export default Loading
