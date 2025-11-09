import { Switch } from "@/components/ui/switch";


export interface DevPageProps {
    a: undefined;
}

const DevPage: React.FC<DevPageProps> = ({ }) => {
    if (process.env.NODE_ENV !== 'development') {
        return <div>Not Found</div>;
    }

    return <div>
        Dev Page
        <Switch>
            
        </Switch>
    </div>;
}

export default DevPage;