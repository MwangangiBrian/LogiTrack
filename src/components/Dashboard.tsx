
import SideBar from './SideBar'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'

const Dashboard = () => {
  return (
    <>
    <SidebarProvider>
    <SideBar />
    <SidebarTrigger />
    </SidebarProvider>
    </>
  )
}

export default Dashboard