import React from 'react'

const FriendsCard = ({ item }) => {

    const {
        _id: userId,
        firstName,
        lastName,
        skills,
        about,
        photoUrl
    } = item;
    
    return (
        <li className="list-row w-3xl bg-base-300">
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
    )
}

export default FriendsCard