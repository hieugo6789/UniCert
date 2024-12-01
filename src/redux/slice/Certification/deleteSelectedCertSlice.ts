import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface deleteCertificate {
    userId: number;
    certificateId: number;
}

interface DeleteCertificateState {
    certificate: deleteCertificate;
    isDeleting: boolean;
    deleteError: boolean;
}

const initialState: DeleteCertificateState = {
    certificate: {} as deleteCertificate,
    isDeleting: false,
    deleteError: false,
};

const certificateDeleteState = createSlice({
    name: "certificateDelete",
    initialState,
    reducers: {
        deleteCertificateStart: (state) => {
            state.isDeleting = true;
        },
        deleteCertificateSuccess: (
            state,
            action: PayloadAction<deleteCertificate>
        ) => {
            state.isDeleting = false;
            state.certificate = action.payload;
            state.deleteError = false;
        },
        deleteCertificateFailure: (state) => {
            state.isDeleting = false;
            state.deleteError = true;
        },
    },
});

export const {
    deleteCertificateStart,
    deleteCertificateSuccess,
    deleteCertificateFailure,
} = certificateDeleteState.actions;

export default certificateDeleteState.reducer;
