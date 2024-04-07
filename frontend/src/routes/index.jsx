import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
    Dashboard,
    Landing,
} from '../pages';

import { NavBar } from '../components';

export default function AppRoutes() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    )
}