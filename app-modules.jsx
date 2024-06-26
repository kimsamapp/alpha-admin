import {Navigate} from 'react-router-dom';
import Logout from './src/pages/Logout';
import LoggedOffPage from './src/pages/LoggedOffPage';
import Dashboard from './src/administrator/Dashboard';
import { PropertyList } from './src/administrator/PropertyList';
import PersonalInformation from './src/administrator/PersonalInformation';
import PropertyForm from './src/administrator/PropertyForm';
import EmailLayout from './src/administrator/EmailLayout';
import RegisterUser from './src/administrator/RegisterUser';
import NotFoundPage from './src/administrator/NotFoundPage';
import ImageUploader from './src/administrator/ImageUploader';
import IntegratedUpload from './src/administrator/IntegratedUpload';
import RealEstatePage from './src/administrator/RealEstatePage';

export const anAuthenticatedPaths = [
    {
        path: '*',
        component: <Navigate to="/" />
    },
    {
        path: '/logout',
        component: <Navigate to="/" />
    },
    {
        path: '/',
        component: <LoggedOffPage />
    },
]

export const authenticatedPaths = [
    {
        path : '*',
        component : <NotFoundPage />
    },
    {
        path : '/logout',
        component : <Logout />
    },
    {
        path : '/',
        component : <Dashboard />
    },
    {
        path : '/property/management',
        component : <PropertyList />
    },
    {
        path : '/property/management/form/:id?',
        component : <PropertyForm />
    }
    ,
    {
        path : '/profile',
        component : <PersonalInformation />
    }
    ,
    {
        path : '/inquiries',
        component : <EmailLayout />
    },
    {
        path : '/register',
        component : <RegisterUser />
    },
    {
        path : '/property/management/upload/:id?',
        component : <IntegratedUpload />
    }
    ,
    {
        path : '/property/management/view/:id?',
        component : <RealEstatePage />
    }
    
]