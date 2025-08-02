import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import React, { JSX, useState } from 'react';

interface ConfirmProps {
    title: string;
    description: string;
}

const useConfirm = ({ title, description }: ConfirmProps): [() => JSX.Element, () => Promise<boolean>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

    const handleClose = () => {
        setPromise(null);
    };

    const confirm = (): Promise<boolean> => {
        return new Promise((resolve) => {
            setPromise({ resolve });
        });
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    const ConfirmationDialog = () => (
        <ResponsiveDialog open={promise !== null} onOpenChange={handleClose} title={title} description={description}>
            <div className="pt-4 w-full flex lg:justify-end flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center">
                <Button variant="outline" onClick={handleCancel} className="w-full lg:w-auto">
                    Cancel
                </Button>
                <Button className="w-full lg:w-auto" onClick={handleConfirm}>
                    Confirm
                </Button>
            </div>
        </ResponsiveDialog>
    );

    return [ConfirmationDialog, confirm];
};

export default useConfirm;
