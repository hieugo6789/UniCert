
const Feedback = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold ">Feedback</h1>
      <div className="mt-4 w-1/2 m-auto shadow p-5 rounded-xl ">
        <div className="flex items-center space-x-4">
          <img src="https://randomuser.me/api/portraits" alt="" className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-gray-600">Software Engineer</p>
          </div>
        </div>
        
        <hr className="my-4" />

        <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,
          vestibulum mi nec, ultricies metus. Donec quis luctus nunc. Morbi rhoncus, ex quis efficitur
          suscipit, dui quam gravida nib
        </p>
      </div>
    </div>
  )
}

export default Feedback
