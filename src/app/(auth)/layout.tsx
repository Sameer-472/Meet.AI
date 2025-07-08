interface Prop {
    children: React.ReactNode
}

const Layout = ({ children }: Prop) => {
    return (
        <div className="bg-muted flex justify-center items-center min-h-svh p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                {children}
            </div>
        </div>
    )
}

export default Layout