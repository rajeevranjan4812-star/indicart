import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { validateCoupon, DEMO_COUPONS } from '../../utils/coupons';

/**
 * ARCHITECTURE EXPLANATION (Requirement 1 & 4):
 * - Uses `createAsyncThunk` for async coupon validation logic.
 * - Handles validation states (pending, fulfilled, rejected).
 */

export const applyCouponThunk = createAsyncThunk(
  'coupons/applyCoupon',
  async ({ code, subtotal }, { rejectWithValue }) => {
    // Simulate network delay for real async experience
    await new Promise((resolve) => setTimeout(resolve, 300));
    const result = validateCoupon(code, subtotal);
    if (!result.valid) {
      return rejectWithValue(result.message);
    }
    return result.coupon;
  }
);

const initialState = {
  appliedCoupon: null,
  availableCoupons: Object.values(DEMO_COUPONS),
  isApplying: false,
  error: null,
};

const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.error = null;
    },
    clearCouponError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCouponThunk.pending, (state) => {
        state.isApplying = true;
        state.error = null;
      })
      .addCase(applyCouponThunk.fulfilled, (state, action) => {
        state.isApplying = false;
        state.appliedCoupon = action.payload;
        state.error = null;
      })
      .addCase(applyCouponThunk.rejected, (state, action) => {
        state.isApplying = false;
        state.error = action.payload || 'Failed to apply coupon.';
      });
  },
});

export const { removeCoupon, clearCouponError } = couponSlice.actions;

export const selectCouponState = (state) => state.coupons;
export const selectAppliedCouponState = createSelector(
  [selectCouponState],
  (coupons) => coupons?.appliedCoupon || null
);
export const selectCouponIsApplying = createSelector(
  [selectCouponState],
  (coupons) => coupons?.isApplying || false
);
export const selectCouponError = createSelector(
  [selectCouponState],
  (coupons) => coupons?.error || null
);

export default couponSlice.reducer;
