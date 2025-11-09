
export interface DevPageProps {
    a: undefined;
}

const DevPage: React.FC<DevPageProps> = ({ }) => {
    if (process.env.NODE_ENV !== 'development') {
        return <div>Not Found</div>;
    }

    return <div>
        Dev Page
    </div>;
}

export default DevPage;