import React from 'react';
import ErrorLayout from '../../layout/ErrorLayout/ErrorLayout';
import NotFound from '../../components/NotFound/NotFound';

export default function ErrorPage() {
    return (
        <ErrorLayout>
            <NotFound />
        </ErrorLayout>
    );
}
