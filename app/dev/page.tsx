import { Switch } from "@/components/ui/switch";
import { UserInfoBlock } from "@/components/UserInfoBlock";


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

        <div className="flex">
            <UserInfoBlock title="タイトル" sum={999} />
        </div>
    </div>;
}

export default DevPage;