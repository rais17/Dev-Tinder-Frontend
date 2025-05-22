
import { Link } from 'react-router-dom';

const FriendsCard = ({ item }) => {

    const {
        _id: toUserId,
        firstName,
        lastName,
        skills,
        about,
        photoUrl
    } = item;
    
    return (
        <div className='w-3xl bg-base-300 flex justify-between items-center'>
            <li className="list-row">
                <div><img className="size-10 rounded-box object-cover" loading='lazy' src={photoUrl} /></div>
                <div>
                    <div>{firstName + " " + lastName}</div>
                    <div className={`flex flex-col gap-2`}>
                        {Array.isArray(skills) && skills.length > 0 && <div className={`text-xs uppercase font-semibold opacity-60 ${!skills && 'hidden'}`}>{skills.join(" ,")}</div>}
                        {about &&
                            <p className="list-col-wrap text-xs">
                                {about}
                            </p>
                        }
                    </div>
                </div>
            </li>

            <Link to={`/chat/${toUserId}`}>
                <button className="btn btn-soft mr-4">Chat</button>
            </Link>
        </div>
    )
}

export default FriendsCard