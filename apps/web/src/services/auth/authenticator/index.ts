import { LocalStorageAccessor } from '@cloudforet/core-lib/local-storage-accessor';

import { SpaceRouter } from '@/router';
import { store } from '@/store';
import { setI18nLocale } from '@/translations';

type UserType = 'USER' | 'DOMAIN_OWNER' | 'API_USER';

abstract class Authenticator {
    static async signIn(credentials: Record<string, any>, userId?: string, userType?: UserType, verify_code?: string): Promise<void> {
        await store.dispatch('user/signIn', {
            domainId: store.state.domain.domainId,
            credentials,
            userType: userType || 'USER',
            userId,
            verify_code,
        });
        await Promise.allSettled([
            // INIT REFERENCE STORE
            store.dispatch('reference/loadAll', { force: true }),
            setI18nLocale(store.state.user.language),
        ]);
        await store.dispatch('display/hideSignInErrorMessage');
        await store.dispatch('error/resetErrorState');
    }

    static async signOut(): Promise<void> {
        try {
            if (SpaceRouter.router) {
                await store.dispatch('user/signOut');
                await store.dispatch('display/hideSignInErrorMessage');
                LocalStorageAccessor.removeItem('hideNotificationEmailModal');
                await store.dispatch('error/resetErrorState');
            }
        } catch (e: unknown) {
            console.error('user sign out failed', e);
        }
    }
}

export {
    Authenticator,
};
