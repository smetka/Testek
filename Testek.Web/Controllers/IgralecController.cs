using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Testek.Web.Data;

namespace Testek.Web.Controllers
{
    public partial class IgralecController : ApiController
    {
        private TestekEntities db = new TestekEntities();

        // GET api/Igralec
        public IEnumerable<Igralec> GetIgralecs()
        {
            return db.Igralec.AsEnumerable();
        }

        // GET api/Igralec/5
        public Igralec GetIgralec(int id)
        {
            Igralec igralec = db.Igralec.Find(id);
            if (igralec == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return igralec;
        }

        // PUT api/Igralec/5
        public HttpResponseMessage PutIgralec(int id, Igralec igralec)
        {
            if (ModelState.IsValid && id == igralec.Id)
            {
                db.Entry(igralec).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/Igralec
        public HttpResponseMessage PostIgralec(Igralec igralec)
        {
            if (ModelState.IsValid)
            {
                db.Igralec.Add(igralec);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, igralec);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = igralec.Id }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/Igralec/5
        public HttpResponseMessage DeleteIgralec(int id)
        {
            Igralec igralec = db.Igralec.Find(id);
            if (igralec == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Igralec.Remove(igralec);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, igralec);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}