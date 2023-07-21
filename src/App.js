import { Routes, Route } from "react-router-dom";
import path from "./utils/path";
import {
    AdminLayout,
    Dashboard,
    CreateCampaign,
    ManageCampaigns,
} from "./pages/admin/";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={path.ADMIN} element={<AdminLayout />}>
                    <Route path={path.DASHBOARD} element={<Dashboard />} />
                    <Route
                        path={path.CREATE_CAMPAIGNS}
                        element={<CreateCampaign />}
                    />
                    <Route
                        path={path.MANAGE_CAMPAIGNS}
                        element={<ManageCampaigns />}
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
