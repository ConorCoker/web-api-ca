const SortByOptions = {
    PopularityAsc: { value: "popularity.asc", label: "Popularity (Low to High)" },
    PopularityDesc: { value: "popularity.desc", label: "Popularity (High to Low)" },
    ReleaseDateAsc: { value: "release_date.asc", label: "Release Date (Oldest First)" },
    ReleaseDateDesc: { value: "release_date.desc", label: "Release Date (Newest First)" },
    RevenueAsc: { value: "revenue.asc", label: "Revenue (Low to High)" },
    RevenueDesc: { value: "revenue.desc", label: "Revenue (High to Low)" },
    PrimaryReleaseDateAsc: { value: "primary_release_date.asc", label: "Primary Release Date (Oldest First)" },
    PrimaryReleaseDateDesc: { value: "primary_release_date.desc", label: "Primary Release Date (Newest First)" },
    OriginalTitleAsc: { value: "original_title.asc", label: "Title (A-Z)" },
    OriginalTitleDesc: { value: "original_title.desc", label: "Title (Z-A)" },
    VoteAverageAsc: { value: "vote_average.asc", label: "Rating (Low to High)" },
    VoteAverageDesc: { value: "vote_average.desc", label: "Rating (High to Low)" },
    VoteCountAsc: { value: "vote_count.asc", label: "Vote Count (Fewest First)" },
    VoteCountDesc: { value: "vote_count.desc", label: "Vote Count (Most First)" }
};

export default SortByOptions;
