SELECT p.id as post_id, 
        title, 
        content, 
        img, 
        profile_pic, 
        date_created, 
        username as author_username 
FROM helo_posts p
JOIN helo_users u ON u.id != p.author_id
WHERE lower(title) LIKE $1 
AND p.author_id != $1
ORDER BY date_created DESC;