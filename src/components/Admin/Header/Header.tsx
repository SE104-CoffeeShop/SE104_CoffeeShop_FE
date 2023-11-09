import React from 'react';
import ProfileButton from '../ProfileButton/ProfileButton';

export default function Header() {
    return (
        <div className="sticky top-0 flex h-fit w-full flex-row items-center justify-between pb-[1rem] pl-[4.81rem] pr-[4.63rem]">
            <h1 className="cursor-pointer select-none font-sans text-[1rem] font-bold">
                THE COFFEESHOP
            </h1>
            <ProfileButton username="Phan Văn Thiện" />
        </div>
    );
}
