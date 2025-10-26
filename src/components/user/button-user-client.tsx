export default function ButtonUserClient({ user }: { user: { name: string, avatar: string | null } | null }) {
    return (
        <div className="flex items-center mr-[1.3rem] gap-[7px] cursor-pointer transition-all duration-300 relative hover:scale-[0.98] hover:opacity-80">
            <div className="inline-block border-2 border-[#2c6e49] p-[2px] w-[44px] h-[44px] overflow-hidden rounded-full">
                <img
                    src={user?.avatar ? user.avatar : "/default-avatar.webp"}
                    alt={user?.name}
                    className="w-full h-full object-cover rounded-full"
                />
            </div>

            <div className="flex items-center gap-[3px]">
                <p className="text-[1.1rem] font-medium text-black max-[850px]:hidden">
                    {user?.name ? user.name : "Usuario"}
                </p>
            </div>
        </div>
    );
}