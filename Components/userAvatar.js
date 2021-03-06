import react from "react"
import Link from "next/link"
function UserAvatar({ user }) {
    return <div className="author_list_pp userAvatar">
        {user.verified ? <Link href={`/talent/${user.address ? user.address : user.userName}`}><a>
            <img className="lazy" src={user.avatar} alt="user" /><i className="fa fa-check"></i>
        </a></Link> :
            <img className="lazy" src={user.avatar} alt="user" />
        }
    </div>
}
export default UserAvatar