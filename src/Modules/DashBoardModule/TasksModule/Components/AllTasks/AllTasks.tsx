
import styles from './AllTasks.module.css'

export default function AllTasks() {
  return (
    <>
      <div className='container-fluied'>
        <div className='d-flex justify-content-between align-items-center bg-white border border-1 p-3'>
            <h1>Tasks</h1>
            <button className='p-2 px-5 bg-warning rounded rounded-5 border-0'>+ Add New Task</button>
        </div>

      </div>

      <div className={`container-fluid ${styles.backgroundPage}`}>
          
          <div className='container d-flex justify-content-between align-items-center bg-white rounded-1'>
              
          </div>
          <div className='container bg-white w-75 rounded-1'>

          </div>
      </div>
    </>
  )
}
