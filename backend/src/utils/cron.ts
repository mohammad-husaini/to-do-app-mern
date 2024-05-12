import cron from 'node-cron';
import ResetCode from '../models/ResetCode.js';

cron.schedule('0 0 * * *', async () => {
    try {
        await ResetCode.deleteMany({ expiresAt: { $lt: new Date() } });
        console.log('Expired reset codes deleted successfully');
    } catch (error) {
        console.error('Failed to delete expired reset codes:', error);
    }
});