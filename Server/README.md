# Admin API Documentation

## admin

All the following routes are prefixed with:
All routes listed below are **relative to `/admin`**.  
Example base URL usage: `http://localhost:PORT/admin`

---
## Authentication Routes

```
/signup  
/login  
```
---

## Year Group Routes

```

/addyear  
/edityear/:id  
/deleteyear/:id  
```

---

## Event Routes
```
/addevent  
/editevent/:id  
/deleteevent/:id  
```

---

## Member Routes

### Member add/edit/delete

```
/addmembers  
/editmember/:id  
/deletemember/:id  
```

### Member image

```
Post /member/:memberId/image
delete /member/:memberId/image

```


---

## Event Image Routes

### Thumbnail
```

Post /:eventId/thumbnail  
Delete /:eventId/thumbnail
```

### Sub Images
```

Post /:eventId/sub-images  
Delete /:eventId/sub-images/:imageKey  
```

---


## Notes
- All routes except `/signup` and `/login` are protected and require authentication
- `:id` → Database document ID
- `:eventId` → Event ID
- `:imageKey` → Stored image identifier


---

# CommoneGet Routes
All routes listed below are **relative to `/public`**.  
Example base URL usage: `http://localhost:PORT/public`


```
/years --> to get all years
/events/:yearId --> get event by Year
/member/:yearId --> get member by Year
/event/:eventId --> get event by eventId
/member/:memberId --> get member by memberId
```
---
