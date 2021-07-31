import Link from "next/link";

export default function Pagination({ pagination }) {
    const { page, total, PER_PAGE } = pagination;
    const lastPage = Math.ceil(total / PER_PAGE)

    return (
        <>
            {page > 1 && (
                <Link href={`/fights?page=${page - 1}`}>
                    <a className="btn-secondary">Prev</a>
                </Link>
            )}
            {page < lastPage && (
                <Link href={`/fights?page=${page + 1}`}>
                    <a className="btn-secondary">Next</a>
                </Link>
            )}
        </>
    )
}
