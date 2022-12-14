const PREFIX = 'PRODICTS_BANKING_API';

export class CacheApp
{
    static DIRETORY_PARTICIPANTS_FIND_ALL= `${PREFIX}:PARTICIPANTS:FIND_ALL`;
    static DIRETORY_PARTICIPANTS_FIND_PAGES = `${PREFIX}:PARTICIPANTS:FIND_PAGES`;
    static DIRETORY_PARTICIPANTS_FIND_PAGES_TOTAL_PAGES   = `${PREFIX}:PARTICIPANTS:FIND_PAGES:TOTAL_PAGES`;
    static DIRETORY_PARTICIPANTS_FIND_PAGES_TOTAL_RECORDS = `${PREFIX}:PARTICIPANTS:FIND_PAGES:TOTAL_RECORDS`;

    static TTL_DEFAULT = 86400;

    static PERSONAL_ACCOUNTS_FIND_ALL = `${PREFIX}:PERSONAL_ACCOUNTS:FIND_ALL`;
    static PERSONAL_ACCOUNTS_FIND_PAGES = `${PREFIX}:PERSONAL_ACCOUNTS:FIND_PAGES`;
    
    static PERSONAL_ACCOUNTS_FIND_PAGES_TOTAL_PAGES   = `${PREFIX}:PERSONAL_ACCOUNTS:FIND_PAGES:TOTAL_PAGES`;
    static PERSONAL_ACCOUNTS_FIND_PAGES_TOTAL_RECORDS = `${PREFIX}:PERSONAL_ACCOUNTS:FIND_PAGES:TOTAL_RECORDS`;
}